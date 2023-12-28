


const LogoMotion = () =>{
    return(
        <div className="brd">
            <div className="logo">
                <img src={process.env.PUBLIC_URL+"/img/fidiplogo.png"}/>
                <img className="prt1 prt" src={process.env.PUBLIC_URL+"./img/logopart1.png"}/>
                <img className="prt2 prt" src={process.env.PUBLIC_URL+"./img/logopart2.png"}/>
                <img className="prt3 prt" src={process.env.PUBLIC_URL+"./img/logopart3.png"}/>
                <img className="prt4 prt" src={process.env.PUBLIC_URL+"./img/logopart4.png"}/>
            </div>
            <img src="./img/fidiptype.png"/>
        </div>
    )
}


export default LogoMotion