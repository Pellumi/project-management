import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table'
import { BiMessageSquare } from 'react-icons/bi'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog';
import axios from 'axios'
import toast from "react-hot-toast";
import { Select, SelectItem } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Label } from '../components/ui/Label';
import { Textarea } from '../components/ui/Input';

const FeedBackPage = () => {
    const [feedback, setFeedback] = React.useState([])
    const [filter, setFilter] = React.useState('')
    const [newFeedback, setNewFeedback] = React.useState({ message: '', businessUnit: '' })
    const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.token

    const handleAddFeedback = async (e) => {
        e.preventDefault()

        const baseURL = "http://localhost:3000/api/feedback"
        try {
            const response = await axios.post(baseURL,
                {
                    message: newFeedback.message,
                    businessUnit: newFeedback.businessUnit,
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setFeedback([response.data, ...feedback])
            setNewFeedback({ message: '', businessUnit: '' })
            setIsAddDialogOpen(false)
            toast.success("Feedback Collected", {
                duration: 4000,
                position: "top-center",
                style: {
                    background: "#333",
                    color: "#fff",
                },
            });
        } catch (error) {
            toast.error("Failed to submit feedback", {
                duration: 4000,
                icon: "🚨",
            })
            console.log(error)
        }
    }

    const fetchFeedback = async (businessUnit = null) => {
        setLoading(true)
        const baseURL = "http://localhost:3000/api/feedback"

        try {
            const response = await axios.get(baseURL, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: { businessUnit }
            })

            setFeedback(response.data)
        } catch (error) {
            // toast.error("Failed to fetch feedback", {
            //     duration: 4000,
            //     icon: "🚨",
            // })
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchFeedback()
    }, [])

    const filteredFeedback = feedback.filter(item =>
        filter === '' || item.businessUnit.toLowerCase() === filter.toLowerCase()
    )

    return (
        <div className='flex-1 rounded-lg p-3 bg-white overflow-auto hide-scrollbar h-full'>
            <div className='mb-4'>
                <h3 className="text-2xl font-bold">Feedback Management</h3>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Submit New Feedback</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddFeedback} className="space-y-4">
                        <div>
                            <Label htmlFor="message">Feedback Message</Label>
                            <Textarea
                                id="message"
                                value={newFeedback.message}
                                onChange={(e) => setNewFeedback({ ...newFeedback, message: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="businessUnit">Business Unit</Label>
                            <Select
                                value={newFeedback.businessUnit}
                                onValueChange={(value) => setNewFeedback({ ...newFeedback, businessUnit: value })}
                                required
                            >
                                <SelectItem value=""></SelectItem>
                                <SelectItem value="Bookshop">Bookshop</SelectItem>
                                <SelectItem value="Restaurant">Restaurant</SelectItem>
                                <SelectItem value="Water Industry">Water Industry</SelectItem>
                            </Select>
                        </div>
                        <Button type="submit" disabled={loading}>Submit Feedback</Button>
                    </form>
                </DialogContent>
            </Dialog>
            <div className="mb-4 gap-4 flex">
                <Select className="w-[200px]" value={filter} onValueChange={setFilter}>
                    <SelectItem value="">All</SelectItem>
                    <SelectItem value="Bookshop">Bookshop</SelectItem>
                    <SelectItem value="Restaurant">Restaurant</SelectItem>
                    <SelectItem value="Water Industry">Water Industry</SelectItem>
                    <SelectItem value="Customer Support">Customer Support</SelectItem>
                </Select>
                <DialogTrigger asChild onClick={setIsAddDialogOpen}>
                    <Button>Submit New Feedback</Button>
                </DialogTrigger>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Business Unit</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredFeedback.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.businessUnit}</TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    <BiMessageSquare className="h-4 w-4 text-muted-foreground" />
                                    <span>{item.message}</span>
                                </div>
                            </TableCell>
                            <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default FeedBackPage