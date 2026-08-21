import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PublicLayout from '@/components/layout/PublicLayout';
import Home from '@/pages/Home';
import Spring2026Recap from '@/pages/meetings/Spring2026Recap';
import Fall2025Recap from '@/pages/meetings/Fall2025Recap';
import Spring2025 from '@/pages/meetings/Spring2025';
import Fall2024 from '@/pages/meetings/Fall2024';
import AdministrativeCore from '@/pages/cores/AdministrativeCore';
import EvaluationCore from '@/pages/cores/EvaluationCore';
import SustainabilityCore from '@/pages/cores/SustainabilityCore';
import News from '@/pages/News';
import Ashg2025 from '@/pages/news/Ashg2025';
import CalendarPage from '@/pages/CalendarPage';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />

          {/* Fall 2026 lives on its own site at fall2026.cfdeconnect.org */}
          <Route path="/meetings/spring-2026-recap" element={<Spring2026Recap />} />
          <Route path="/meetings/fall-2025-recap" element={<Fall2025Recap />} />
          <Route path="/meetings/spring-2025" element={<Spring2025 />} />
          <Route path="/meetings/fall-2024" element={<Fall2024 />} />

          <Route path="/cores/administrative" element={<AdministrativeCore />} />
          <Route path="/cores/evaluation" element={<EvaluationCore />} />
          <Route path="/cores/sustainability" element={<SustainabilityCore />} />

          <Route path="/news" element={<News />} />
          <Route path="/news/cfde-at-ashg-2025" element={<Ashg2025 />} />

          <Route path="/calendar" element={<CalendarPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
