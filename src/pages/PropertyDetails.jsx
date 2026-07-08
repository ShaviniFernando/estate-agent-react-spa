import { useParams } from 'react-router-dom';

export default function PropertyDetails() {
  const { id } = useParams();
  return (
    <div>
      <h1>Property Details</h1>
      <p>Property ID: {id}</p>
    </div>
  );
}
