import properties from '../data/properties';
import PropertyList from '../components/PropertyList';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <PropertyList properties={properties} />
    </div>
  );
}
