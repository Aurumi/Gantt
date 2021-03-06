import React, { useEffect, useState } from 'react';
import ReactGantt from 'gantt-for-react';

const Gantt = () => {
    const [viewMode, setViewMode] = useState('Day');
    const [tasks, setTasks] = useState();

    const getTasks = () => {
        let names = [
            ['Redesign website', [0, 7]],
            ['Write new content', [1, 4]],
            ['Apply new styles', [3, 6]],
            ['Review', [7, 7]],
            ['Deploy', [8, 9]],
            ['Go Live!', [10, 10]],
        ];

        let tasks = names.map(function (name, i) {
            let today = new Date();
            let start = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
            );
            let end = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
            );
            start.setDate(today.getDate() + name[1][0]);
            end.setDate(today.getDate() + name[1][1]);
            return {
                start: start,
                end: end,
                name: name[0],
                id: 'Task ' + i,
                progress: parseInt(Math.random() * 100, 10),
            };
        });

        tasks[1].dependencies = 'Task 0';
        tasks[2].dependencies = 'Task 1, Task 0';
        tasks[3].dependencies = 'Task 2';
        tasks[5].dependencies = 'Task 4';

        tasks[0].custom_class = 'bar-milestone';
        tasks[0].progress = 60;

        tasks.slice(0, parseInt(Math.random() * 4 + 1));
        setTasks(tasks);
    };

    useEffect(() => {
        setInterval(() => {
            setViewMode(
                ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'][
                    parseInt(Math.random() * 5 + 1) - 1
                ]
            );
            getTasks();
        }, 5000);
    }, []);

    if (!tasks) {
        return 'Загрузка...';
    }
    return <ReactGantt tasks={tasks} viewMode={viewMode} />;
};

export default Gantt;
