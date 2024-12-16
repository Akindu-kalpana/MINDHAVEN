import React, { useState } from 'react';
import axios from 'axios';
import '../style/RelaxationContent.css';

export const Locker = () => {
  return (
    <div className="relaxation-container">
      <h1 className="main-title">Yoga and Meditation Videos (YouTube)</h1>

      <section className="video-section">
        <h2>Yoga with Adriene - Relaxing Yoga for Stress Relief</h2>
        <a href="https://www.youtube.com/watch?v=v7AYKMP6rOE" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
        <p>Adriene Mishler is known for her calming and easy-to-follow yoga sessions, ideal for relieving tension and stress.</p>

        <h2>The Mindful Movement - Guided Meditation for Anxiety Relief</h2>
        <a href="https://www.youtube.com/watch?v=ZToicYcHIOU" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
        <p>A guided meditation video for reducing anxiety and promoting inner peace.</p>

        <h2>Yoga with Kassandra - 10-Minute Morning Yoga</h2>
        <a href="https://www.youtube.com/watch?v=4pKly2JojMw" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
        <p>A short and gentle yoga routine designed to energize and relieve stress in the morning.</p>

        <h2>Headspace - Guided Meditation</h2>
        <a href="https://www.youtube.com/watch?v=ZJ1XrZk8S8Q" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
        <p>A beginner-friendly guided meditation focused on mindfulness and relaxation.</p>
      </section>

      <h1 className="main-title">Best Games for Relaxation</h1>

      <section className="games-section">
        <h2>Calm Colors (App Store / Google Play Store)</h2>
        <a href="https://play.google.com/store/apps/details?id=com.paint.color.by.number.coloring.pages.pixel.art" target="_blank" rel="noopener noreferrer">Download on Google Play</a>
        <p>This game focuses on coloring and relaxing with soothing color patterns and stress-relieving gameplay.</p>

        <h2>Monument Valley (App Store / Google Play Store)</h2>
        <a href="https://play.google.com/store/search?q=Monument%20Valley&c=apps" target="_blank" rel="noopener noreferrer">Download on Google Play</a>
        <p>A visually stunning puzzle game with calm music and intricate designs. It’s a great game for relaxing your mind.</p>

        <h2>Zen Koi (App Store / Google Play Store)</h2>
        <a href="https://play.google.com/store/apps/details?id=com.landsharkgames.zenkoi2.android" target="_blank" rel="noopener noreferrer">Download on Google Play</a>
        <p>A peaceful and relaxing game where you can raise koi fish and create ponds in a serene environment.</p>

        <h2>Prune (App Store / Google Play Store)</h2>
        <a href="https://play.google.com/store/search?q=prune&c=apps" target="_blank" rel="noopener noreferrer">Download on Google Play</a>
        <p>A beautiful and meditative game about growing trees, solving puzzles, and managing nature.</p>

        <h2>Flow Free (App Store / Google Play Store)</h2>
        <a href="https://play.google.com/store/search?q=Flow%20Free&c=apps" target="_blank" rel="noopener noreferrer">Download on Google Play</a>
        <p>A calming puzzle game where players connect matching colored dots to create a flow.</p>
      </section>

      <h1 className="main-title">Music Therapy Links</h1>

      <section className="music-section">
        <h2>Spotify Calming Playlists</h2>
        <ul>
          <li><a href="https://open.spotify.com/playlist/37i9dQZF1DWZxu8pDxi2n2" target="_blank" rel="noopener noreferrer">Peaceful Piano</a></li>
          <li><a href="https://open.spotify.com/playlist/37i9dQZF1DWXbYsM2fNZFw" target="_blank" rel="noopener noreferrer">Calm Vibes</a></li>
          <li><a href="https://open.spotify.com/playlist/37i9dQZF1DWXbJv7DaqJ70" target="_blank" rel="noopener noreferrer">Deep Focus</a></li>
          <li><a href="https://open.spotify.com/playlist/37i9dQZF1DWuKqK1pm0pR3" target="_blank" rel="noopener noreferrer">Stress Relief</a></li>
        </ul>

        <h2>YouTube Relaxation Channels</h2>
        <ul>
          <li><a href="https://www.youtube.com/c/SoothingRelaxation" target="_blank" rel="noopener noreferrer">Soothing Relaxation</a></li>
          <li><a href="https://www.youtube.com/c/YellowBrickCinema" target="_blank" rel="noopener noreferrer">Yellow Brick Cinema</a></li>
          <li><a href="https://www.youtube.com/c/MeditationRelaxMusic" target="_blank" rel="noopener noreferrer">Meditation Relax Music</a></li>
          <li><a href="https://www.youtube.com/c/ChillOutMusicRelax" target="_blank" rel="noopener noreferrer">Chill Out Music</a></li>
          <li><a href="https://www.youtube.com/c/RelaxingWhiteNoise" target="_blank" rel="noopener noreferrer">Relaxing White Noise</a></li>
          <li><a href="https://www.youtube.com/c/AmbientWorlds" target="_blank" rel="noopener noreferrer">Ambient Worlds</a></li>
          <li><a href="https://www.youtube.com/c/SleepyJohn" target="_blank" rel="noopener noreferrer">Sleepy John</a></li>
        </ul>
      </section>
    </div>
  );
  
};

