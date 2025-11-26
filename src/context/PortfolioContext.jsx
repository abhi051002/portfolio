import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [portfolioId, setPortfolioId] = useState(localStorage.getItem('portfolioId') || '');
  const [bioData, setBioData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [articles, setArticles] = useState([]);
  
  const [loading, setLoading] = useState({
    bio: false,
    skills: false,
    experiences: false,
    education: false,
    projects: false,
    articles: false,
  });

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Fetch Portfolio ID
  const fetchPortfolioId = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/portfolios?slug=abhijit-nanda`);
      const id = response.data[0]._id;
      localStorage.setItem('portfolioId', id);
      setPortfolioId(id);
      return id;
    } catch (error) {
      console.error('Error fetching portfolio ID:', error);
      return null;
    }
  }, [backendUrl]);

  // Fetch Bio Data (called once, reused everywhere)
  const fetchBioData = useCallback(async (id = portfolioId) => {
    if (!id) return;
    
    try {
      setLoading(prev => ({ ...prev, bio: true }));
      const res = await axios.get(`${backendUrl}/bio/${id}`);
      localStorage.setItem('totalYearofExperience', res.data.totalYears);
      setBioData(res.data);
      return res.data;
    } catch (error) {
      console.error('Error fetching bio:', error);
      return null;
    } finally {
      setLoading(prev => ({ ...prev, bio: false }));
    }
  }, [backendUrl, portfolioId]);

  // Fetch Skills
  const fetchSkills = useCallback(async (id = portfolioId) => {
    if (!id) return;
    
    try {
      setLoading(prev => ({ ...prev, skills: true }));
      const categoriesRes = await axios.get(`${backendUrl}/skills/categories/${id}`);
      
      const categoriesWithItems = await Promise.all(
        categoriesRes.data.map(async (cat) => {
          const itemsRes = await axios.get(`${backendUrl}/skills/items/${cat._id}`);
          return { ...cat, items: itemsRes.data };
        })
      );
      
      setSkills(categoriesWithItems);
      return categoriesWithItems;
    } catch (error) {
      console.error('Error fetching skills:', error);
      return [];
    } finally {
      setLoading(prev => ({ ...prev, skills: false }));
    }
  }, [backendUrl, portfolioId]);

  // Fetch Experiences
  const fetchExperiences = useCallback(async (id = portfolioId) => {
    if (!id) return;
    
    try {
      setLoading(prev => ({ ...prev, experiences: true }));
      const res = await axios.get(`${backendUrl}/experiences/${id}`);
      setExperiences(res.data);
      return res.data;
    } catch (error) {
      console.error('Error fetching experiences:', error);
      return [];
    } finally {
      setLoading(prev => ({ ...prev, experiences: false }));
    }
  }, [backendUrl, portfolioId]);

  // Fetch Education
  const fetchEducation = useCallback(async (id = portfolioId) => {
    if (!id) return;
    
    try {
      setLoading(prev => ({ ...prev, education: true }));
      const res = await axios.get(`${backendUrl}/education/${id}`);
      setEducation(res.data);
      return res.data;
    } catch (error) {
      console.error('Error fetching education:', error);
      return [];
    } finally {
      setLoading(prev => ({ ...prev, education: false }));
    }
  }, [backendUrl, portfolioId]);

  // Fetch Projects
  const fetchProjects = useCallback(async (id = portfolioId) => {
    if (!id) return;
    
    try {
      setLoading(prev => ({ ...prev, projects: true }));
      const res = await axios.get(`${backendUrl}/projects/${id}`);
      setProjects(res.data);
      return res.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  }, [backendUrl, portfolioId]);

  // Fetch Articles
  const fetchArticles = useCallback(async (id = portfolioId) => {
    if (!id) return;
    
    try {
      setLoading(prev => ({ ...prev, articles: true }));
      const res = await axios.get(`${backendUrl}/articles/${id}`);
      setArticles(res.data);
      return res.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    } finally {
      setLoading(prev => ({ ...prev, articles: false }));
    }
  }, [backendUrl, portfolioId]);

  // Initialize on mount
  useEffect(() => {
    const initializePortfolio = async () => {
      let id = portfolioId;
      
      if (!id) {
        id = await fetchPortfolioId();
      }
      
      if (id) {
        // Fetch bio data immediately (needed for navbar, footer, boot screen)
        await fetchBioData(id);
      }
    };

    if (backendUrl) {
      initializePortfolio();
    }
  }, [backendUrl,fetchPortfolioId, fetchBioData, portfolioId]); // Only run once on mount

  const value = {
    // Data
    portfolioId,
    bioData,
    skills,
    experiences,
    education,
    projects,
    articles,
    
    // Loading states
    loading,
    
    // Fetch functions (in case you need to refetch)
    fetchBioData,
    fetchSkills,
    fetchExperiences,
    fetchEducation,
    fetchProjects,
    fetchArticles,
    
    // Utility
    backendUrl,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};