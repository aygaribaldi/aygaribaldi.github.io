const skillGroups = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'C#'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Angular', 'GraphQL', 'HTML/CSS'],
  },
  {
    label: 'Backend',
    items: ['Java Spring', 'Node.js', 'REST APIs', 'ETL Pipelines'],
  },
  {
    label: 'AWS',
    items: ['S3', 'SQS', 'SNS', 'DynamoDB', 'Lambda', 'CloudWatch', 'CloudFormation/CDK', 'API Gateway', 'ECS'],
  },
  {
    label: 'AI',
    items: ['Amazon Bedrock', 'Claude', 'LLM Agents'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="tag">Skills</div>
      <h2 className="heading">
        What I <span>Work With</span>
      </h2>
      <div className="skill-groups">
        {skillGroups.map(g => (
          <div key={g.label} className="skill-group">
            <h3 className="skill-group-label">{g.label}</h3>
            <div className="skill-pills">
              {g.items.map(s => (
                <span key={s} className="skill-pill">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
