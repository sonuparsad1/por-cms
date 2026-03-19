import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import Certifications from './pages/Certifications';
import Achievements from './pages/Achievements';
import FAQPage from './pages/FAQPage';
import Resume from './pages/Resume';
import Experience from './pages/Experience';
import Services from './pages/Services';
import LearningDashboard from './pages/LearningDashboard';
import AIShowcase from './pages/AIShowcase';
import Experiments from './pages/Experiments';
import Gallery from './pages/Gallery';
import TestimonialsPage from './pages/TestimonialsPage';
import Login from './pages/Login';
import ProjectDetail from './pages/ProjectDetail';
import PageTransition from './components/layout/PageTransition';
import SEOTags from './components/ui/SEOTags';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <SettingsProvider>
            <NotificationProvider>
              <SEOTags />
              <Layout>
                <PageTransition>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                    <Route path="/certifications" element={<Certifications />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/faqs" element={<FAQPage />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/learning" element={<LearningDashboard />} />
                    <Route path="/ai-showcase" element={<AIShowcase />} />
                    <Route path="/experiments" element={<Experiments />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/testimonials" element={<TestimonialsPage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/:tab" 
                      element={
                        <ProtectedRoute>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </PageTransition>
              </Layout>
            </NotificationProvider>
          </SettingsProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
