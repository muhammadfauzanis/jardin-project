import ButtonBackToMenu from '../components/ButtonBackToMenu';
import { BsEmojiTear } from 'react-icons/bs';

const NotFoundPage = () => {
  return (
    <div className="bg-secondary flex flex-col min-h-screen justify-center items-center gap-3">
      <div className="flex items-center gap-x-3">
        <p className="text-2xl font-bold ">Whoops</p>
        <BsEmojiTear size={30} />
      </div>
      <p>404 Not Found Page</p>

      <ButtonBackToMenu />
    </div>
  );
};

export default NotFoundPage;
