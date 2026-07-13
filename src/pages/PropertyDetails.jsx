import { useParams } from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import properties from '../data/properties';
import ImageGallery from '../components/ImageGallery';

export default function PropertyDetails() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div>
        <h1>Property not found</h1>
      </div>
    );
  }

  return (
    <div className="property-details">
      <h1>{property.location}</h1>
      <ImageGallery images={property.images} />
      <div>
        <h2>{property.type}</h2>
        <h3>Rs. {property.price.toLocaleString()}</h3>
        <p>Bedrooms: {property.bedrooms}</p>
      </div>

      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <div className="tab-content">
            <p>{property.description}</p>
          </div>
        </TabPanel>
        
        <TabPanel>
          <div className="tab-content">
            <img src={property.floorplan} alt="Floor plan" className="floorplan-img" />
          </div>
        </TabPanel>

        <TabPanel>
          <div className="tab-content">
            <iframe
              src={property.mapEmbedUrl}
              width="100%"
              height="400"
              title="Property location map"
            ></iframe>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
