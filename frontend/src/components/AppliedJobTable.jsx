import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full ">
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-4 py-2">Date</TableHead>
                        <TableHead className="px-4 py-2">Job Role</TableHead>
                        <TableHead className="px-4 py-2">Company</TableHead>
                        <TableHead className="px-4 py-2 text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center p-4">You haven't applied to any jobs yet.</td>
                            </tr>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob._id} className="hover:bg-gray-100">
                                    <TableCell className="px-4 py-2">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell className="px-4 py-2">{appliedJob.job?.title}</TableCell>
                                    <TableCell className="px-4 py-2">{appliedJob.job?.company?.name}</TableCell>
                                    <TableCell className="px-4 py-2 text-right">
                                        <Badge className={`font-bold ${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                                            {appliedJob.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable