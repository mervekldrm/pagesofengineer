// placeholder Blogcard component (original file was empty)
const Blogcard = ({ title, excerpt }) => (
  <article className="p-4 border rounded-lg shadow-sm">
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-sm text-gray-600">{excerpt}</p>
  </article>
);

export default Blogcard;
