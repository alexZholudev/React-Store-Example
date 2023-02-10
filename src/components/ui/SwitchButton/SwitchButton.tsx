import {createRef, FC, useState} from "react";
import styles from "./SwitchButton.module.scss";

interface ISwitchButton {
    active?: number;
    left?: string;
    middle?: string;
    right?: string;
    middle2?: string;
    search?: boolean;
    discovery?: boolean;
    w?: string;
    status: (val: number) => void;
}

const SwitchButton: FC<ISwitchButton> = ({w,left = "electronics", middle = "jewelery",middle2= "men's clothing", right = "women's clothing", search, discovery,status,}) => {
    const [active, setActive] = useState(0);
    const [from, setFrom] = useState(0);
    const [translanteX, setTranslanteX] = useState<number>(0);
    const wrapRef = createRef<HTMLDivElement>();
    const bgRef = createRef<HTMLDivElement>();
    const [value, setValue] = useState<string | null | undefined>(left);

    const onSort = (val: number) => {
        let fromPX: number = 0;
        status(val)
        setActive(val);
        if (wrapRef.current && bgRef.current) {
            const item = wrapRef.current.children[val].textContent;
            const itemW = wrapRef.current.children[0].clientWidth;
            setValue(item);
            if (val === 0) {
                bgRef.current.style.transform = `translateX(${0}px)`;
                fromPX = 0;
            }

            if (val === 1) {
                bgRef.current.style.transform = `translateX(${itemW}px)`;
                fromPX = itemW;
            }
            if (val === 2) {
                setFrom(translanteX);
                bgRef.current.style.transform = `translateX(${itemW * 2}px)`;
                fromPX = itemW * 2;
            }
            if (val === 3) {
                setFrom(translanteX);
                bgRef.current.style.transform = `translateX(${itemW * 3}px)`;
                fromPX = itemW * 3;
            }
        }
    };

    return (
        <div className={'relative h-12 border-emerald-500 border-2 w-full rounded-[28px] mx-auto mb-12' + ` ${w ? w : 'w-1/2'}`}>
            <div ref={bgRef} className={"left-0 top-0 ease-linear duration-300 absolute w-1/4 flex justify-center text-md flex items-center justify-center h-11 border-emerald-500 border-2 rounded-[28px] items-center bg-emerald-500"}>
                <span className={"text-stone-100 text-center"}>{value}</span>
            </div>
            <div ref={wrapRef} className={``}>
                <button className={`w-1/4 h-12  text-sm text-stone-100  uppercase`} onClick={() => onSort(0)}>
                    {left}
                </button>
                <button className={`w-1/4 h-12  text-sm  text-stone-100 uppercase`} onClick={() => onSort(1)}>
                    {middle}
                </button>
                <button className={`w-1/4 h-12  text-sm  text-stone-100 uppercase`} onClick={() => onSort(2)}>
                    {middle2}
                </button>
                <button  className={`w-1/4 h-12  text-sm  text-stone-100 uppercase`} onClick={() => onSort(3)}>
                    {right}
                </button>
            </div>
        </div>
    );
};

export default SwitchButton;
//["electronics","jewelery","men's clothing","women's clothing"]
