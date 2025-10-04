import { useSearchParams } from 'react-router-dom';
import Map from '../../components/Map';
import CatalogBlock from '../../components/CatalogBlock';

const HomePage = () => {
    const [searchParams] = useSearchParams();
    const currentTab = searchParams.get('tab') || 'catalog';

    const renderContent = () => {
        switch (currentTab) {
            case 'map':
                return <Map />;
            case 'catalog':
            default:
                return <CatalogBlock />;
        }
    };

    return (
        <div>
            {renderContent()}
        </div>
    );
};

export default HomePage;