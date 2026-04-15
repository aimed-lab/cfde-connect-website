import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const BOX_API = 'https://api.box.com/2.0';

async function getOrCreateFolder(accessToken, parentId, folderName) {
  // Search for existing folder
  const listRes = await fetch(`${BOX_API}/folders/${parentId}/items?fields=id,name,type&limit=200`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const listData = await listRes.json();
  const existing = listData.entries?.find(e => e.type === 'folder' && e.name === folderName);
  if (existing) return existing.id;

  // Create folder
  const createRes = await fetch(`${BOX_API}/folders`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: folderName, parent: { id: parentId } }),
  });
  const created = await createRes.json();
  return created.id;
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  if (user.role !== 'admin') return Response.json({ error: 'Admin only' }, { status: 403 });

  const { accessToken } = await base44.asServiceRole.connectors.getConnection('box');

  const body = await req.json();
  const { action, consortiumName, noteTitle, noteContent, fileId } = body;

  // List consortia folders under "CFDE Meeting Notes" root folder
  if (action === 'list_folders') {
    // Get or create root CFDE folder
    const rootId = await getOrCreateFolder(accessToken, '0', 'CFDE Meeting Notes');
    const res = await fetch(`${BOX_API}/folders/${rootId}/items?fields=id,name,type,modified_at&limit=200`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await res.json();
    return Response.json({ rootFolderId: rootId, folders: data.entries || [] });
  }

  // List files in a consortium folder
  if (action === 'list_files') {
    const { folderId } = body;
    const res = await fetch(`${BOX_API}/folders/${folderId}/items?fields=id,name,type,modified_at,size&limit=200`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await res.json();
    return Response.json({ files: data.entries || [] });
  }

  // Upload a new meeting note to a consortium folder
  if (action === 'upload_note') {
    const rootId = await getOrCreateFolder(accessToken, '0', 'CFDE Meeting Notes');
    const consortiumFolderId = await getOrCreateFolder(accessToken, rootId, consortiumName);

    const fileBlob = new Blob([noteContent], { type: 'text/plain' });
    const fileName = `${noteTitle}.txt`;

    const formData = new FormData();
    formData.append('attributes', JSON.stringify({
      name: fileName,
      parent: { id: consortiumFolderId },
    }));
    formData.append('file', fileBlob, fileName);

    const uploadRes = await fetch('https://upload.box.com/api/2.0/files/content', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: formData,
    });
    const uploadData = await uploadRes.json();
    const uploadedFile = uploadData.entries?.[0];
    return Response.json({ success: true, file: uploadedFile });
  }

  // Get a download link for a file
  if (action === 'get_download_url') {
    const res = await fetch(`${BOX_API}/files/${fileId}/content`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
      redirect: 'manual',
    });
    const downloadUrl = res.headers.get('Location');
    return Response.json({ downloadUrl });
  }

  // Delete a file
  if (action === 'delete_file') {
    await fetch(`${BOX_API}/files/${fileId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return Response.json({ success: true });
  }

  return Response.json({ error: 'Unknown action' }, { status: 400 });
});