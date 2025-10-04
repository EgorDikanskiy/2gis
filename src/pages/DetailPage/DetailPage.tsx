import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const DetailPage = () => {
    const [, setSearchParams] = useSearchParams();

    useEffect(() => {
        // Очищаем все query параметры при переходе на DetailPage
        setSearchParams({}, { replace: true });
    }, [setSearchParams]);

    return (
        <div>DetailPage</div>
    )
}

export default DetailPage;