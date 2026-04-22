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
            Software engineer at <strong>Amazon</strong> in <strong>NYC</strong>, building
            platform infrastructure and advertiser-facing products across the Ads Console.
            Passionate about web development, developer tooling, and creating great user experiences.
          </p>
          <br />
          <p>
            Outside of work, you'll find me scuba diving, skiing, dancing hip hop,
            playing field hockey, reading, or at a music festival.
          </p>
        </div>
      </div>
    </section>
  );
}
