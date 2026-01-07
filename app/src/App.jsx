import { Routes, Route } from 'react-router-dom'
import TopicGrid from './components/TopicGrid'
import TopicDetail from './components/TopicDetail'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<TopicGrid />} />
        <Route path="/topic/:id" element={<TopicDetail />} />
      </Routes>
    </div>
  )
}

export default App
