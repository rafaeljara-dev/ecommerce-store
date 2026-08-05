import { db } from "@/lib/firebase";
import { Product } from "@/types";

const STORE_ID = process.env.STORE_ID!;

const getProduct = async (id: string): Promise<Product | null> => {
    try {
        const productDoc = await db
            .collection('stores')
            .doc(STORE_ID)
            .collection('products')
            .doc(id)
            .get();

        if (!productDoc.exists) {
            return null;
        }

        const data = productDoc.data();

        return {
            id: productDoc.id,
            name: data?.name || '',
            price: String(data?.price || 0),
            isFeatured: data?.isFeatured || false,
            category: {
                id: data?.categoryId || '',
                name: data?.categoryName || '',
                billboard: {
                    id: '',
                    label: '',
                    imageUrl: ''
                }
            },
            size: {
                id: data?.sizeId || '',
                name: data?.sizeName || '',
                value: data?.sizeValue || ''
            },
            color: {
                id: data?.colorId || '',
                name: data?.colorName || '',
                value: data?.colorValue || ''
            },
            images: (data?.images || []).map((img: any, index: number) => ({
                id: `${productDoc.id}-${index}`,
                url: img.url
            }))
        };
    } catch (error) {
        console.warn('Error fetching product:', error);
        return null;
    }
};

export default getProduct;
