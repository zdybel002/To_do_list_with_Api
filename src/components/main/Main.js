import React, { useState } from "react";

import AllTasks from "../Tasks/AllTasks";

import Categories from "../Categories/AllCategories/Categories";
import Wrapper from "../UI/Categoriy_list_wraper/Wrapper";

import NewCategory from "../Categories/NewCategory/BtmNewCategory";
import NewTask from "../Tasks/NewTask/NewTask";
import TaskProvider from "../../store/TaskProvider";

import styles from "./Main.module.css";

function Tasks() {
    return (
        <React.Fragment>
            <div className={styles.taskContainer}>
                <TaskProvider>
                    <div className={styles.rightNav}>
                        <Categories />
                        <NewCategory />
                    </div>

                    <div className={styles.CurrentTaskContainer}>
                        <AllTasks></AllTasks>
                        <NewTask></NewTask>
                    </div>
                </TaskProvider>
            </div>
        </React.Fragment>
    );
}
export default Tasks;
