import { UserData } from "~/stores/user/interfaces/userData";

export interface OrderData {
  data: {
    hash: string;
    currency: string;
    orderId: number;
    summary: {
      amount: number;
      tax: number;
      online_payment: number;
      total: number;
    };
    section: {
      id: number;
      title: string;
      description: string;
      price: number;
      discound: number;
      total_price: number;
      course_id: number;
      course: {
        id: number;
        name: string;
        sub_description: string;
        description: string;
        image: string;
        study_level: string;
        department: string;
        instructor_id: number;
        perview: string;
        created_at: string;
        updated_at: string;
      };
    };
  };
  auth: {
    status: boolean;
    user: UserData | null;
    next: string;
  };
  message?: string;
}
