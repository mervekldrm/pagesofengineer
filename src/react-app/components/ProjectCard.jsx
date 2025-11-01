// placeholder ProjectCard component (original file was empty)
const ProjectCard = ({ title, description }) => (
  <div className="p-4 border rounded-lg shadow-sm">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-700">{description}</p>
  </div>
);

export default ProjectCard;
