// Accurate CFDE program and center data from cfde.info and cfdeconnect.org

export const CFDE_PROGRAMS = [
  "4D Nucleome (4DN)",
  "A2CPS",
  "Bridge2AI",
  "ExRNA",
  "GlyGen",
  "GTEx",
  "HMP",
  "HuBMAP",
  "IDG",
  "Kids First",
  "KOMP2",
  "LINCS",
  "Metabolomics",
  "MoTrPAC",
  "NPH (Nutrition for Precision Health)",
  "SCGE",
  "SenNet",
  "SMaHT",
  "SPARC",
];

export const CFDE_CENTERS = [
  "CFDE Data Resource Center (DRC)",
  "CFDE Integration & Coordination Center (ICC)",
  "CFDE Cloud Workspace Center (CWIC)",
  "CFDE Knowledge Center (KC)",
  "CFDE Training Center (TC)",
];

export const ALL_AFFILIATIONS = [
  ...CFDE_PROGRAMS,
  ...CFDE_CENTERS,
  "NIH Common Fund",
  "Other",
];

export const WORKING_GROUPS = [
  "Ontology",
  "Knowledge Graph",
  "Training & Outreach",
  "Evaluation",
  "Communications",
  "Cloud Infrastructure",
  "FAIR Data",
  "AI & Machine Learning",
  "Data Standards",
];

export const EVENT_TYPES = [
  "All-Hands Meeting",
  "Conference",
  "Workshop",
  "Webinar",
  "Hackathon",
  "Training Course",
  "Working Group",
  "Poster Session",
  "Social",
  "Other",
];

export const ALL_EVENT_CONSORTIA = ["All CFDE", ...ALL_AFFILIATIONS];

// Program descriptions from cfde.info
export const PROGRAM_DESCRIPTIONS = {
  "4D Nucleome (4DN)": "Maps the three-dimensional organization of the nucleus across space and time.",
  "A2CPS": "Acute to Chronic Pain Signatures — identifying biomarkers that predict transition from acute to chronic pain.",
  "Bridge2AI": "Develops AI-ready datasets and ethical frameworks for AI-driven biomedical discovery.",
  "ExRNA": "Studies extracellular RNA communication and biomarkers.",
  "GlyGen": "Provides glycan and glycoprotein data resources for biomedical research.",
  "GTEx": "Genotype-Tissue Expression — gene expression and regulation across human tissues.",
  "HMP": "Human Microbiome Project — characterizes microbial communities in and on the human body.",
  "HuBMAP": "Human BioMolecular Atlas Program — mapping the human body at single-cell resolution.",
  "IDG": "Illuminating the Druggable Genome — studying understudied druggable proteins.",
  "Kids First": "Gabriella Miller Kids First — pediatric cancer and structural birth defects genomics.",
  "KOMP2": "Knockout Mouse Phenotyping — functional annotation of all mouse genes.",
  "LINCS": "Library of Integrated Network-based Cellular Signatures — cellular response to perturbation.",
  "Metabolomics": "Advancing metabolomics technologies and data standards.",
  "MoTrPAC": "Molecular Transducers of Physical Activity Consortium — molecular effects of exercise.",
  "NPH (Nutrition for Precision Health)": "Nutrition for Precision Health — personalizing dietary recommendations.",
  "SCGE": "Somatic Cell Genome Editing — developing genome editing tools.",
  "SenNet": "Mapping senescent cells across human tissues throughout the lifespan.",
  "SMaHT": "Somatic Mosaicism across Human Tissues — somatic mutations in normal cells.",
  "SPARC": "Stimulating Peripheral Activity to Relieve Conditions — peripheral nervous system mapping.",
  "CFDE Data Resource Center (DRC)": "The CFDE Workbench — data portal, metadata search, and FAIR AI-ready resources.",
  "CFDE Integration & Coordination Center (ICC)": "CONNECT ICC — coordinating CFDE operations, evaluation, and sustainability (UAB, CU Anschutz, UCLA).",
  "CFDE Cloud Workspace Center (CWIC)": "Cloud analysis platform for integrating and sharing CF data (JHU, SDSC, Penn State, TACC).",
  "CFDE Knowledge Center (KC)": "Knowledge graph linking scientific findings across CF programs.",
  "CFDE Training Center (TC)": "Training and outreach to expand CFDE data accessibility (ORAU).",
};

// Key CFDE tools and resources
export const CFDE_RESOURCES = [
  { name: "CFDE Workbench", url: "https://info.cfde.cloud", description: "Data portal and metadata search" },
  { name: "Playbook Workflow Builder", url: "https://playbook-workflow-builder.cloud/graph/extend", description: "Build bioinformatics workflows without coding" },
  { name: "Gene-Set-Cart", url: "https://genesetcart.cfde.cloud/", description: "Assemble and analyze gene sets" },
  { name: "CFDE-GSE", url: "https://gse.cfde.cloud/", description: "Query gene sets against CF program libraries" },
  { name: "CFDE Chatbot", url: "https://info.cfde.cloud/data/chat", description: "AI assistant for CFDE data" },
  { name: "CFDE Programs", url: "https://info.cfde.cloud/info/dcc", description: "Explore all Common Fund programs" },
];