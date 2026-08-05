import { db } from "@/lib/firebase";
import { Billboard } from "@/types";

const STORE_ID = process.env.STORE_ID!;

const getBillboard = async (id: string): Promise<Billboard | null> => {
    try {
        const billboardDoc = await db
            .collection('stores')
            .doc(STORE_ID)
            .collection('billboards')
            .doc(id)
            .get();

        if (!billboardDoc.exists) {
            return null;
        }

        const data = billboardDoc.data();

        return {
            id: billboardDoc.id,
            label: data?.label || '',
            imageUrl: data?.imageUrl || ''
        };
    } catch (error) {
        console.warn('Error fetching billboard:', error);
        return null;
    }
};

export default getBillboard;
