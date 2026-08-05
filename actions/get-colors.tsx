import { db } from "@/lib/firebase";
import { Color } from "@/types";

const STORE_ID = process.env.STORE_ID!;

const getColors = async (): Promise<Color[]> => {
    try {
        const colorsSnapshot = await db
            .collection('stores')
            .doc(STORE_ID)
            .collection('colors')
            .orderBy('createdAt', 'desc')
            .get();

        const colors: Color[] = colorsSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                value: data.value
            };
        });

        return colors;
    } catch (error) {
        console.warn('Error fetching colors:', error);
        return [];
    }
};

export default getColors;
