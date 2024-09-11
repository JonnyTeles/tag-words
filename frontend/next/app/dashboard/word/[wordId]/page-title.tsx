"use client"
import { useEffect } from 'react';
import { useCustomWordContext } from '../provider/custom-word-context';

const PageTitle: React.FC = () => {
  const { word } = useCustomWordContext();
  
  useEffect(() => {
    if (word && word.body) {
      document.title = word.body.word || 'Palavra';
    }
  }, [word]);

  return null;
};

export default PageTitle;