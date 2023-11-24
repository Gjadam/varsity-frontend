import React, { useEffect, useState } from 'react'
import DataTable from '../DataTable/DataTable'
import './AdminPanelIndex.css'
import AdminCoursesCounter from '../../../Components/AdminCoursesCounter/AdminCoursesCounter'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import { useQuery } from 'react-query';

export default function AdminPanelIndex() {

    const { data } = useQuery("PAdminInfos", () => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        return fetch(`http://localhost:4000/v1/infos/p-admin`, {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
    })

    const tableData = [
        {
            "name": "جلسات",
            "تعداد": data?.infos[2].count,
            "fill": "#f7c32e"
        },
        {
            "name": "دوره ها",
            "تعداد": data?.infos[1].count,
            "fill": "#0cbc87"
        },
        {
            "name": "ثبت نامی ها",
            "تعداد": data?.infos[0].count,
            "fill": "#066ac9"
        },
    ]



    return (
        <DataTable title={'داشبورد'}>
            <div className="dashboard">
                <div className="dashboard__chart">
                    <RadialBarChart
                        width={990}
                        height={350}
                        innerRadius="40%"
                        outerRadius="110%"
                        data={tableData}
                        startAngle={360}
                        endAngle={90}
                    >
                        <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='تعداد' />
                        <Tooltip />
                    </RadialBarChart>
                </div>
                <div className="dashboard__boxes">
                    {
                        data?.infos.map(item => (
                            <AdminCoursesCounter title={item.title} count={item.count} />
                        ))
                    }
                </div>
                <div className="dashboard__information">
                    <div className="dashboard__information__chart"></div>
                    <div className="dashboard__information__last-users">
                        <h1 className="add-category__top__title">آخرین ثبت نام ها:</h1>
                        <div className="admin-courses">
                            <div className="admin-courses__table__wrapper">
                                <table className='admin-courses__table'>
                                    <thead className="admin-courses__table-header">
                                        <tr>
                                            <th className='admin-courses__table__th rounded-start'>شناسه</th>
                                            <th className='admin-courses__table__th'>نام</th>
                                            <th className='admin-courses__table__th'>نام کاربری</th>
                                            <th className='admin-courses__table__th'>ایمیل</th>
                                        </tr>
                                    </thead>
                                    <tbody className='admin-courses__table-body'>
                                        {
                                            data?.lastUsers.map((user, index) => (
                                                <tr className='admin-courses__table__tr'>
                                                    <th className='admin-courses__table__th'>{index + 1}</th>
                                                    <th className='admin-courses__table__th item-width'>{user.name}</th>
                                                    <th className='admin-courses__table__th item-width font-weight-item'>{user.username}</th>
                                                    <th className='admin-courses__table__th item-width '>{user.email}</th>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DataTable>
    )
}
