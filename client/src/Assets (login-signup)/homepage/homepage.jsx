import React, { useState } from "react";
import styles from "./homepage.module.css";
import { useNavigate } from "react-router-dom";

export default function FitnessHero() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null);

  const handlePopup = (title, content) => {
    setPopup({ title, content });
  };

  const handleClose = () => {
    setPopup(null);
  };

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>FITNESS PRO</h1>
        <nav className={styles.nav}>
          <a href="#home" className={styles.navLink}>Home</a>
          <a href="#programs" className={styles.navLink}>Programs</a>
          <a href="#why-us" className={styles.navLink}>Why Us</a>
          <a href="#pricing" className={styles.navLink}>Plans</a>
          <a href="#testimonial" className={styles.navLink}>About us</a>
        </nav>
        <button className={styles.joinBtn} onClick={() => navigate("/login")}>JOIN NOW!</button>
      </header>

      <section id="home" className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>THE BEST FITNESS CLUB</span>
          <h2 className={styles.heroTitle}>GET HEALTHY BODY<br />WITH THE <span className={styles.highlight}>PERFECT EXERCISES</span></h2>
          <p className={styles.heroDescription}>We are here to help you build a healthy body and mind through the power of fitness.</p>
          <div className={styles.buttons}>
            <button className={styles.getStarted} onClick={() => navigate("/login")}>Get Started</button>
            <a href="#programs" className={styles.learnMore}>See Programs</a>
          </div>
        </div>
      </section>

      <section id="programs" className={styles.section} style={{ minHeight: "50vh" }}>
        <h2 className={styles.sectionTitle}>Our Programs</h2>
        <div className={styles.cardContainer}>
          <div className={styles.card} onClick={() => handlePopup("💪 Strength Training ", "Builds muscle and boosts overall strength using resistance exercises like weightlifting, squats, and push-ups. Great for improving endurance, metabolism, and bone health.")}>💪 Strength Training</div>
          <div className={styles.card} onClick={() => handlePopup("🏃 Cardio Exercises ", "Focuses on raising your heart rate through activities like running, cycling, and HIIT. Helps improve heart health, stamina, and burns calories effectively.")}>🏃 Cardio Exercises</div>
          <div className={styles.card} onClick={() => handlePopup("🏋️ Body Building ", "Targets muscle growth and physique through structured workouts and nutrition. Involves lifting heavier weights and following a dedicated training split.")}>🏋️ Body Building</div>
          <div className={styles.card} onClick={() => handlePopup("⚖️ Weight Loss", "A balanced mix of cardio, strength, and guided nutrition plans to help you shed fat and tone up. Focuses on creating a calorie deficit safely and sustainably.")}>⚖️ Weight Loss</div>
        </div>
      </section>

      <section id="why-us" className={`${styles.section} ${styles.dark} ${styles.blurBackground}`} style={{ minHeight: "50vh" }}>
        <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
        <ul className={styles.benefitsList}>
          <li>✔️ Proper Trainings</li>
          <li>✔️ Smart Workout Programs</li>
          <li>✔️ Beginner Friendly</li>
          <li>✔️ Nutrition Guide</li>
        </ul>
      </section>

      <section id="pricing" className={styles.section} style={{ minHeight: "50vh" }}>
        <h2 className={styles.sectionTitle}>Plans</h2>
        <div className={styles.cardContainer}>
          <div className={styles.pricingCard}> 
            <h2>Beginner 🏋🏻‍♂️</h2>
            <br></br>
            <p>Start strong with the basics</p>
            <ul>
               <br></br>
              <li>✔ Easy-to-follow routines</li>
              <li>✔ Focus on building consistency</li>
              <li>✔ Gradual progression</li>
              <li>✔ Low-pressure environment</li>
            </ul>
          </div>
          
          <div className={styles.pricingCard}>
            <h2>Advance 🏋🏻‍♂️</h2>
             <br></br>
            <p>Challenge yourself at a higher level!
            </p>
            <ul>
               <br></br>
              <li>✔ Higher intensity and complexity</li>
              <li>✔ Focused on reaching new goals</li>
              <li>✔ Demands greater effort and commitment</li>
              <li>✔ For users with solid experience</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="testimonial" className={`${styles.section} ${styles.dark} ${styles.blurBackground}`} style={{ minHeight: "50vh" }}>
        <h2 className={styles.sectionTitle}>About Us</h2>
        <blockquote className={styles.testimonial}>
          The Fitness Pro is a modern fitness guide created to help you reach your goals without the confusion. We offer clear workout tutorials, easy-to-follow training plans, and simple gym meal ideas with nutrition facts. Whether you're just starting out or pushing for the next level, we're here to keep you focused, motivated, and on track every step of the way.
        </blockquote>
      </section>

      {popup && (
        <div className={styles.popupOverlay} onClick={handleClose}>
          <div className={styles.popupBox} onClick={(e) => e.stopPropagation()}>
            <button className={styles.popupClose} onClick={handleClose}>✖</button>
            <h3>{popup.title}</h3>
            <p>{popup.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
