import { Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";

const SearchInput = ({
    onValueChange
}) => {
    return (
        <Input
            size="sm"
            isClearable
            radius="sm"
            classNames={{
                label: "text-black/50 dark:text-white/90",
                input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                    "bg-transparent",
                    "dark:bg-transparent",
                    "hover:bg-transparent",
                    "dark:hover:bg-transparent",
                    "group-data-[focused=true]:bg-transparent",
                    "dark:group-data-[focused=true]:bg-transparent",
                    "!cursor-text",
                ],
            }}
            placeholder="搜索公司"
            onValueChange={onValueChange}
            startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
        />
    );
}

export default SearchInput;