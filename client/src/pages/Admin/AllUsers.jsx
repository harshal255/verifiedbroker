import { useEffect, useState } from "react";
import {
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import axios from "axios";

const ALL_USERS_HEAD = ["Member", "Email", "Show", "Delete"];

const AllUsersComponent = () => {

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState(null);
  const handleOpen = () => setOpen(!open);

  const [user, setUser] = useState({
    name: '',
    email: '',
  })

  useEffect(() => {
    const fetchUsers = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://v-bbackend.vercel.app/api/admin/users?page=${page}`,
      };

      axios.request(config)
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchUsers();

  }, [page]);

  const fetchUser = async (uId) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://v-bbackend.vercel.app/api/admin/user/${uId}`,
      withCredentials: true
    };

    await axios.request(config)
      .then((response) => {
        setUser({
          ...user,
          name: response.data.user.name,
          email: response.data.user.email
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleUserDelete = async (userId) => {
    try {
      const response = await axios.delete(`https://v-bbackend.vercel.app/api/admin/user/${userId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      alert('User deleted successfully!');
    } catch (error) {
      alert('Failed to delete user: ' + error.response.data.message);
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {ALL_USERS_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== ALL_USERS_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users && users.length >= 1 ? (
              users.map(({ _id, name, email }, index) => {
                const isLast = index === users.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        {/* <Avatar src={img} alt={name} size="sm" /> */}
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {email}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="View Details">
                        <IconButton variant="text" color="orange">
                          <AiFillEye
                            className="h-4 w-4"
                            onClick={async () => {
                              await fetchUser(_id);
                              handleOpen();
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </td>
                    <td className={classes}>
                      <Tooltip content="View Details">
                        <IconButton variant="text" onClick={()=>{handleUserDelete(_id)}} color="orange">
                          <AiFillDelete className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="flex justify-center items-center">
                    <img
                      src="/gifs/notFoundAnimation.gif"
                      alt="Oops, nothing there"
                      className="w-48 h-auto"
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody >
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {page}
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <Button variant="outlined" size="sm" onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      </CardFooter>
      <Dialog open={open} handler={handleOpen} size={"xl"}>
        <DialogHeader>Users Details</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-5 text-black">
            <span>User Name {user.name}</span>
            <span>Email id: {user.email} </span>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="orange" onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default AllUsersComponent
