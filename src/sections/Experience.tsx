export default function Experience() {
  return (
    <section id="exp" className="exp-section">
      <div className="tag">Experience</div>
      <h2 className="heading">Where I've <span>Built</span></h2>

      <div className="exp-item">
        <div className="exp-top">
          <h3>Amazon</h3>
          <span className="exp-date">2022 – Present</span>
        </div>
        <p className="exp-role">SDE II · NYC</p>
        <ul className="exp-bullets">
          <li>Led a 7-engineer migration of a major ad product onto our team's form-building platform, designing the architecture consumed by multiple product teams</li>
          <li>Designed and built multi-page form infrastructure on that platform, enabling a new simplified campaign creation experience</li>
          <li>Shipped an automated bidding feature adopted by 17K+ advertisers, improving impressions by 86% and reducing cost-per-click by 24%</li>
          <li>Built backend services and ETL pipelines powering conversion reporting and brand measurement dashboards</li>
          <li>Built the module registry for our team's internal application platform, enabling teams across the advertising console to publish and consume independently deployable microfrontends</li>
        </ul>
      </div>

      <div className="exp-item">
        <div className="exp-top">
          <h3>Amazon</h3>
          <span className="exp-date">2021 – 2022</span>
        </div>
        <p className="exp-role">SDE I · NYC</p>
        <ul className="exp-bullets">
          <li>Shipped 10+ advertising features across campaign creation, targeting, and bidding systems serving millions of advertisers</li>
          <li>Redesigned bidding UX that drove 3x improvement in recommendation adoption and 59% increase in suggested bid usage</li>
          <li>Built features across 3 codebases as a cross-team contributor; introduced a backend design pattern adopted org-wide</li>
          <li>Authored engineering standards for feature rollout and project estimation, adopted across a 50+ engineer organization</li>
        </ul>
      </div>

    </section>
  );
}
