import { useQuery } from "react-query";
import { axios_api } from "../../../config";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

const retrieveProducts = async () => {
    const { data } = await axios_api.get(
        `/products/amazon`,{
        params: {
            per_page: 100
        }
    });
    return data;
};


function Products() {

    const {
        data,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['api/products/amazon'],
        queryFn: retrieveProducts
    });

    if (isLoading) return "Fetching posts...";
    if (error) return `An error occurred: ${error.message}`;

    return (
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
                                    {product.title.slice(0,30)}...
                                </Typography>
                                <Typography color="blue-gray" className="font-medium">
                                    {`$${product.price}`}
                                </Typography>
                            </div>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button
                                ripple={false}
                                fullWidth={true}
                                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            >
                                Add to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
    );
};

export default Products
