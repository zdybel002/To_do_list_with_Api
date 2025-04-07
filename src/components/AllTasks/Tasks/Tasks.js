import React, { useState } from "react";

import CurrentTask from "../CurrentTask/CurrentTask";

import styles from "./Tasks.module.css";
import Categories from "../../Categories/AllCategories/Categories";
import Wrapper from "../../UI/Categoriy_list_wraper/Wrapper";

import NewCategory from "../../Categories/NewCategory/BtmNewCategory";
import NewTask from "../NewTask/NewTask";

function Tasks() {
    const [idTakenCategory, setIdTakenCategory] = useState([]);
    const addCurrentTasks = (taken_values) => {
        console.log(taken_values);
        setIdTakenCategory(taken_values);
    };

    return (
        <React.Fragment>
            <div className={styles.taskContainer}>
                <Wrapper>
                    <Categories onAddCurrentTasks={addCurrentTasks} />

                    <NewCategory />
                </Wrapper>

                <div className={styles.CurrentTaskContainer}>
                    {/* <CurrentTask idOfCategory={idTakenCategory}></CurrentTask> */}
                    <NewTask></NewTask>
                </div>
            </div>
        </React.Fragment>
    );
}
export default Tasks;
