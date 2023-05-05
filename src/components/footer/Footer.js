import '../../css/footer.css';
const Footer = () => {
    const year = new Date().getFullYear();

    return <footer>{`Copyright © Game Web ${year}`}</footer>;
};

export default Footer;