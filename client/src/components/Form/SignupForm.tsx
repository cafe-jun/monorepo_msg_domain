interface Props {
  onChange: (event: React.SyntheticEvent) => void;
  signupInfo: {
    fullname: string;
    email: string;
    password: string;
    confirmpassword: string;
  };
}

const SignupForm: React.FC<Props> = ({ onChange, signupInfo }) => {
  const { fullname, email, password, confirmpassword } = signupInfo;

  return (
    <>
      <div className="relative z-0 w-full mb-6 group">
        <div className="mb-6">
          <label
            // for="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            이메일
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
          />
        </div>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <div className="mb-6">
          <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">
            패스워드
          </label>
          <input
            type="pasword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
          />
        </div>
      </div>
      <div className="relative z-0 w-full mb-1 group">
        <div className="mb-6">
          <label
            // for="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            패스워드 확인
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
          />
        </div>
      </div>
    </>
  );
};

export default SignupForm;
