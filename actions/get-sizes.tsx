import { db } from "@/lib/firebase";
import { Size } from "@/types";

const STORE_ID = process.env.STORE_ID!;

const getSizes = async (): Promise<Size[]> => {
    try {
        const sizesSnapshot = await db
            .collection('stores')
            .doc(STORE_ID)
            .collection('sizes')
            .orderBy('createdAt', 'desc')
            .get();

        const sizes: Size[] = sizesSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                value: data.value
            };
        });

        return sizes;
    } catch (error) {
        console.warn('Error fetching sizes:', error);
        return [];
    }
};

export default getSizes;
