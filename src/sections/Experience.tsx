export default function Experience() {
  return (
    <section id="exp" className="exp-section">
      <div className="tag">Experience</div>
      <h2 className="heading">Where I've <span>Built</span></h2>

      <div className="exp-item">
        <div className="exp-top">
          <h3>Amazon</h3>
          <span className="exp-date">Present</span>
        </div>
        <p className="exp-role">Software Engineer · NYC</p>
        <p className="exp-desc">
          Building scalable, high-impact systems. Shipping features that serve millions of users globally.
        </p>
      </div>

      <div className="exp-item">
        <div className="exp-top">
          <h3>West Chester University</h3>
          <span className="exp-date">2017 – 2021</span>
        </div>
        <p className="exp-role">B.S. Computer Science · 4.0 Major GPA</p>
        <p className="exp-desc">
          Board of Governor's Full Tuition Scholar. Honors College. Dean's List.
        </p>
      </div>
    </section>
  );
}
