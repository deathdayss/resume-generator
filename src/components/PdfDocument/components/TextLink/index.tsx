import { Link, Text } from "@react-pdf/renderer";
import { useMemo } from "react"

interface TextLinkProps {
    text: string
}

// const spaceReg = /\s/g;
const spaceReg = new RegExp(/\s/, 'i');

const TextLink = ({ text }: TextLinkProps) => {
    const textToLink = useMemo(() => {
        const renderGroup = []
        let findLink = false;
        let startLink = 0; // inclusive
        let validText = '';
        let addLast = true;
        for (let i = 0; i < text.length; ++i) {
            let onceFind = false;
            if (text.substring(i, i + 8) === 'https:\/\/') {
                startLink = i;
                onceFind = true;
                i += 7;
            }
            else if (text.substring(i, i + 7) === 'http:\/\/') {
                startLink = i;
                onceFind = true;
                i += 6;
            }
            if (onceFind) {
                renderGroup.push(validText);
                validText = '';
                findLink = true;
            }
            if (!findLink) {
                validText += text[i];
            }
            else if (spaceReg.test(text[i]) || i === text.length - 1) {
                console.log('link index', startLink, i, text[startLink], text[i]);
                let linkText = text.substring(startLink, i);
                if (i === text.length - 1) {
                    linkText = text.substring(startLink, i + 1);
                    addLast = false;
                }
                renderGroup.push(<Link src={linkText}>{linkText}</Link>)
                validText = text[i];
                findLink = false;
            }
        }
        if (validText && addLast) {
            renderGroup.push(validText);
        }
        console.log('renderGroup',renderGroup)
        return renderGroup;
    }, [text]);
    return <>{textToLink.map((jsx, index) => <Text key={index}>{jsx}</Text>)}</>
}

export default TextLink;