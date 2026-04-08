import React, { useState, useEffect } from 'react';
import Clicker from '../components/Clicker';
import Upgrades from '../components/Upgrades';
import Stats from '../components/Stats';
import Settings from '../components/Settings';
import AudioPlayer from '../components/AudioPlayer';
import '../styles/main.css';

// Список всех карт
const MAPS = [
  '/Spidi_photo/Maps/372678d4-ab5e-49c2-855c-a45234de13ee.png',
  '/Spidi_photo/Maps/67cdf8b2-6750-4fb1-bdaf-667528c2650e.png',
  '/Spidi_photo/Maps/ad927475-06b8-4e7b-8081-46d9554e9e20.png',
  '/Spidi_photo/Maps/b5369044-6fdf-431b-9bbe-f9c74efca694.png',
  '/Spidi_photo/Maps/c40598d3-b021-4dc3-ad14-1edb6de1e6d4.png',
  '/Spidi_photo/Maps/c7942eda-721c-46d0-b87f-7291c0d32314.png',
  '/Spidi_photo/Maps/d6d46483-20cd-467b-896c-567dab904f11.png',
  '/Spidi_photo/Maps/dc16ccab-6170-450e-9663-5bd075093e57.png',
  '/Spidi_photo/Maps/ea8fec50-6128-409c-bd85-0e02f33141c9.png',
  '/Spidi_photo/Maps/f07d6849-8
