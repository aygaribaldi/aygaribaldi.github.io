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
            I'm a PADI-certified scuba diver, a hip hop dancer, a skier, a field hockey
            player, a pianist, an avid reader, and a festival regular.
          </p>
        </div>
      </div>
    </section>
  );
}
