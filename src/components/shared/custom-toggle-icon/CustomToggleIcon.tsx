import { PanelRightOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';

const CustomToggleIcon = () => {
  const { state } = useSidebar();
  return (
    <div className="w-full h-full bg-gradient-to-r from-[#ff5200] to-[#B20E38] rounded-[50%] flex justify-center items-center cursor-pointer">
      <PanelRightOpen
        className={cn(
          'h-4 w-4 transition-transform duration-200 text-white',
          state === 'expanded' ? 'rotate-180' : 'rotate-0'
        )}
      />
    </div>
  );
};

export default CustomToggleIcon;
