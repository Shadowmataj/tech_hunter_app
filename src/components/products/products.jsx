import { useQuery } from "react-query";
import { axios_api } from "../../../config";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

function Products() {

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const [sortBy, setSortBy] = useState("price");
    const [sortOrder, setSortOrder] = useState("asc");
    const [maxPrice, setMaxPrice] = useState(100000);
    const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(100000);
    const [minPrice, setMinPrice] = useState(600);
    const [debouncedMinPrice, setDebouncedMinPrice] = useState(600);


    const retrieveProducts = async () => {
        const { data } = await axios_api.get(
            `/products/amazon`, {
            params: {
                per_page: perPage,
                page: page,
                sort_by: sortBy,
                sort_order: sortOrder,
                min_price: debouncedMinPrice,
                max_price: debouncedMaxPrice,
            }
        });
        return data;
    };

    const {
        data,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['api/products/amazon', page, perPage, sortBy, sortOrder, debouncedMaxPrice, debouncedMinPrice],
        queryFn: retrieveProducts
    });


    useEffect(() => {
        const timer_min = setTimeout(() => {
            const num = Number(minPrice);
            if (num === '' || num === 0 || isNaN(num)) {
                setMinPrice(0);
            } else if (num > maxPrice) {
                setMinPrice(maxPrice - 1);
            }
            setDebouncedMinPrice(num);
        }, 1000);

        return () => clearTimeout(timer_min);
    }, [minPrice]);

    useEffect(() => {
        const timer_max = setTimeout(() => {
            const num = Number(maxPrice);
            if (num === '' || num === 0 || isNaN(num)) {
                setMaxPrice(100000);
            } else if (num < minPrice) {
                setMaxPrice(minPrice + 1);
            }
            setDebouncedMaxPrice(num);
        }, 1000);
        return () => clearTimeout(timer_max);
    }, [maxPrice]);

    if (isLoading) return "Fetching posts...";
    if (error) return `An error occurred: ${error.message}`;

    return (
        <div className="container flex flex-col mx-auto p-4 lg:flex-row lg:items-start">
            <div id="filter" className="w-full mr-4 mb-6 lg:w-1/5">
                <div className="mb-8">
                    <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
                        Filters
                    </Typography>
                </div>
                <div className="flex flex-col gap-4 lg:justify-around">
                    <div className="flex flex-row gap-2 justify-center items-center lg:flex-col">
                        <label htmlFor="perPage" className="mb-2 font-medium text-blue-gray-900 lg:w-2/5">
                            Por página:
                        </label>
                        <select
                            id="perPage"
                            value={perPage}
                            onChange={(e) => { setPerPage(parseInt(e.target.value)); setPage(1); }}
                            className="border border-blue-gray-300 rounded-md p-2 lg:w-3/5"
                        >
                            <option value={6}>6</option>
                            <option value={12}>12</option>
                            <option value={24}>24</option>
                            <option value={48}>48</option>
                        </select>
                    </div>
                    <div className="flex flex-row gap-2 justify-center items-center lg:flex-col">
                        <label htmlFor="sortBy" className="mb-2 font-medium text-blue-gray-900 lg:w-2/5">
                            Ordenar por:
                        </label>
                        <select
                            id="sortBy"
                            value={sortBy}
                            onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                            className="border border-blue-gray-300 rounded-md p-2 lg:w-3/5"
                        >
                            <option value="price">Precio</option>
                            <option value="ranking">Ranking</option>
                        </select>
                    </div>
                    <div className="flex flex-row gap-2 justify-center items-center lg:flex-col">
                        <label htmlFor="sortOrder" className="mb-2 font-medium text-blue-gray-900 lg:w-2/5">
                            De forma:
                        </label>
                        <select
                            id="sortOrder"
                            value={sortOrder}
                            onChange={(e) => { setSortOrder(e.target.value); setPage(1); }}
                            className="border border-blue-gray-300 rounded-md p-2 lg:w-3/5"
                        >
                            <option value="asc">Ascendente</option>
                            <option value="desc">Descendente</option>
                        </select>
                    </div>
                    <div className="flex flex-row gap-2 justify-center items-center lg:flex-col">
                        <label htmlFor="minPrice" className="mb-2 font-medium text-blue-gray-900 lg:w-2/5">
                            Precio:
                        </label>
                        <input
                            type="number"
                            id="minPrice"
                            value={minPrice}
                            min={0}
                            onChange={(e) => {
                                setMinPrice(e.target.value); setPage(1)
                            }}
                            className="border border-blue-gray-300 rounded-md p-2 lg:w-2/5"
                        />
                        <Typography color="blue-gray" className="font-medium lg:hidden">
                            -
                        </Typography>
                        <div className="flex flex-row gap-2 justify-center items-center lg:flex-col">
                            <input
                                type="number"
                                id="maxPrice"
                                value={maxPrice}
                                max={100000}
                                onChange={(e) => {
                                    setMaxPrice(e.target.value); setPage(1)
                                }}
                                className="border border-blue-gray-300 rounded-md p-2 lg:w-2/5"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div id="products" className="w-full lg:w-4/5">
                <div className="mb-8">
                    <Typography variant="h3" color="blue-gray" className="mb-2 text-center">
                        Productos
                    </Typography>
                    <Typography color="gray" className="mb-8 text-center">
                        Descubre los últimos productos en Amazon.
                    </Typography>
                </div>
                <div className="flex flex-row flex-wrap gap-4 justify-center">
                    {
                        data.products.map((product) => (
                            <Card className="w-64 flex grow-0 justify-items-stretch">
                                <CardHeader shadow={false} floated={false} className="h-full">
                                    <img
                                        src={product.images[0]}
                                        alt="card-image"
                                        className="h-full w-full object-contain"
                                    />
                                </CardHeader>
                                <CardBody className="h-56">
                                    <div className="mb-2 flex items-center justify-between">
                                        <Typography color="blue-gray" className="font-medium">
                                            {product.title.slice(0, 30)}...
                                        </Typography>
                                        <Typography color="blue-gray" className="font-medium">
                                            {`$${product.price}`}
                                        </Typography>
                                    </div>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <a href={product.url} target="_blank" rel="noopener noreferrer" className="w-full">
                                        <Button
                                            ripple={false}
                                            fullWidth={true}
                                            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                        >
                                            Ir al artículo
                                        </Button>
                                    </a>
                                </CardFooter>
                            </Card>
                        ))
                    }
                </div>
                <div className="flex flex-col justify-center items-center mt-8 mb-8">
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mt-4 text-center">
                            Página {data.page} de {data.pages} | Productos: {data.total}
                        </Typography>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-4 mt-4">
                        <Button
                            ripple={false}
                            fullWidth={false}
                            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            onClick={() => setPage(page - 1)}
                            disabled={!(data.has_prev)}
                        >
                            -
                        </Button>
                        {data.page}
                        <Button
                            ripple={false}
                            fullWidth={false}
                            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            onClick={() => setPage(page + 1)}
                            disabled={!(data.has_next)}
                        >
                            +
                        </Button>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Products
