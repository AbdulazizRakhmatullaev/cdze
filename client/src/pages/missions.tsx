const Tasks = () => {
    return (
        <>
          <div className="title">
            <div className="grid"></div>
            <div className="tRow">Missions</div>
          </div>

          <div className="header">
              <img src="./missions.jpg" className="hd_img" />
              <div className="hd_desc">Complete the objectives, Soldier.<br/> Extra points are on the line!</div>

              <div className="hdres">Missions complete: 7</div>
          </div>

          <div className="misCat">Essential</div>
          <div className="mis">
            <div className="misInf">
                <div className="misT">TON mission</div>
                <div className="misDesc">1,000 CDZE</div>
            </div>

            <button className="misProg">Execute!</button>
          </div>
          
        </>
    )
}

export default Tasks;
