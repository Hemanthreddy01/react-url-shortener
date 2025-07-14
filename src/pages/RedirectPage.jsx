import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOriginalUrl } from '../services/api';
import Logger from '../utils/logger';


const RedirectPage = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToOriginal = async () => {

        Logger.info(`Attempting to redirect for shortcode: ${shortcode}`);

      try {
        const longUrl = await getOriginalUrl(shortcode);
        window.location.href = longUrl;
      } catch (err) {
        alert(err.message);
        navigate('/');
      }
    };

    redirectToOriginal();
  }, [shortcode, navigate]);

  return null;
};

export default RedirectPage;
