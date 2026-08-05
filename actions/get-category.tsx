import { db } from "@/lib/firebase";
import { Category } from "@/types";

const STORE_ID = process.env.STORE_ID!;

const getCategory = async (id: string): Promise<Category | null> => {
    try {
        const categoryDoc = await db
            .collection('stores')
            .doc(STORE_ID)
            .collection('categories')
            .doc(id)
            .get();

        if (!categoryDoc.exists) {
            return null;
        }

        const data = categoryDoc.data();

        return {
            id: categoryDoc.id,
            name: data?.name || '',
            billboard: {
                id: data?.billboardId || '',
                label: data?.billboardLabel || '',
                imageUrl: data?.billboardImageUrl || ''
            }
        };
    } catch (error) {
        console.warn('Error fetching category:', error);
        return null;
    }
};

export default getCategory;
