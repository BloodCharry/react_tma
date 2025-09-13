import {
    FiSearch,
    FiPlus,
    FiChevronLeft,
    FiEdit2,
    FiPhone,
    FiTrash2,
    FiUser,
    FiTool,
    FiPackage,
    FiList,
    FiSettings
} from 'react-icons/fi';

type IconName =
    'search'
    | 'plus'
    | 'back'
    | 'edit'
    | 'phone'
    | 'trash'
    | 'user'
    | 'tool'
    | 'package'
    | 'list'
    | 'settings';

const map: Record<IconName, React.ElementType> = {
    search: FiSearch,
    plus: FiPlus,
    back: FiChevronLeft,
    edit: FiEdit2,
    phone: FiPhone,
    trash: FiTrash2,
    user: FiUser,
    tool: FiTool,
    package: FiPackage,
    list: FiList,
    settings: FiSettings
};

export interface IconProps {
    name: IconName;
    size?: number;
    color?: string;
    ariaLabel?: string;
}

export const Icon: React.FC<IconProps> = ({name, size = 18, color, ariaLabel}) => {
    const C = map[name];
    if (!C) return null;
    return <C size={size} color={color} aria-hidden={ariaLabel ? undefined : true} aria-label={ariaLabel}/>;
};

export default Icon;