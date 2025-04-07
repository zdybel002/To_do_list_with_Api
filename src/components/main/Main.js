import React, { useState } from "react";

import CurrentTask from "../Tasks/CurrentTask/CurrentTask";

import Categories from "../Categories/AllCategories/Categories";
import Wrapper from "../UI/Categoriy_list_wraper/Wrapper";

import NewCategory from "../Categories/NewCategory/BtmNewCategory";
import NewTask from "../Tasks/NewTask/NewTask";
import TaskProvider from "../../store/TaskProvider";

import styles from "./Main.module.css";

function Tasks() {
    const [idTakenCategory, setIdTakenCategory] = useState([]);
    const addCurrentTasks = (taken_values) => {
        console.log(taken_values);
        setIdTakenCategory(taken_values);
    };

    return (
        <React.Fragment>
            <div className={styles.taskContainer}>
                <TaskProvider>
                    <Wrapper>
                        <Categories onAddCurrentTasks={addCurrentTasks} />

                        <NewCategory />
                    </Wrapper>
                    <div className={styles.CurrentTaskContainer}>
                        <CurrentTask
                            idOfCategory={idTakenCategory}
                        ></CurrentTask>
                        <NewTask></NewTask>
                    </div>
                </TaskProvider>
            </div>
        </React.Fragment>
    );
}
export default Tasks;
