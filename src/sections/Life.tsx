const hobbies = [
  { icon: '🤿', label: 'Scuba Diving' },
  { icon: '⛷️', label: 'Skiing' },
  { icon: '💃', label: 'Hip Hop Dance' },
  { icon: '🏑', label: 'Field Hockey' },
  { icon: '🎹', label: 'Piano' },
  { icon: '📚', label: 'Reading' },
  { icon: '🎶', label: 'EDM & Festivals' },
  { icon: '🌊', label: 'Ocean Life' },
];

export default function Life() {
  return (
    <section id="life" className="hobbies-section">
      <div className="tag">A Rich Life</div>
      <h2 className="heading">
        I collect hobbies like they're<br />
        <span>going out of style.</span>
      </h2>
      <div className="hobby-pills">
        {hobbies.map(h => (
          <div key={h.label} className="hobby-pill">
            <span className="icon">{h.icon}</span> {h.label}
          </div>
        ))}
      </div>
    </section>
  );
}
