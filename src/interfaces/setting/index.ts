export type SettingType = {
  subjectName: string;
  name: string;
  teacher: string;
  description: string;
  title: string;
  slogan: string;
  location: string;
  phoneNumber: string;
  logo: string;
  url: string;
  dashboard: string;
  paymentMethods: {
    kashir: {
      isWork: boolean;
      mid: string;
      mode: string;
    };
  };
  coursesHeaderData: {
    3: {
      revision: string;
      season: string;
    };
    2: {
      revision: string;
      season: string;
    };
    1: {
      revision: string;
      season: string;
    };
  };
  questionSupport: {
    isWork: boolean;
    numbers?: {
      1: string;
      2: string;
      3: string;
    }
  };
};
