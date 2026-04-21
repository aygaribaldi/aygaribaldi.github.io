export default function About() {
  return (
    <section id="about">
      <div className="two-col">
        <div className="col">
          <div className="tag">About</div>
          <h2 className="heading">
            Engineer.<br />
            <span>Diver. Explorer.</span>
          </h2>
          <div className="neon-stats">
            <div className="neon-stat">
              <span className="val">4.0</span>
              <span className="lbl">GPA</span>
            </div>
            <div className="neon-stat">
              <span className="val">NYC</span>
              <span className="lbl">Based</span>
            </div>
            <div className="neon-stat">
              <span className="val">PADI</span>
              <span className="lbl">Certified</span>
            </div>
          </div>
        </div>
        <div className="col">
          <p>
            I'm a software engineer who believes life is too short for just one hobby.
            After graduating from West Chester University with a <strong>4.0 GPA</strong> on
            a full-tuition scholarship, I moved to NYC and joined <strong>Amazon</strong>.
          </p>
          <br />
          <p>
            I'm a PADI-certified scuba diver, a hip hop dancer, a skier, a field hockey
            player, a pianist, an avid reader, and a festival regular.
          </p>
        </div>
      </div>
    </section>
  );
}
