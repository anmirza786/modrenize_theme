import React from "react";
import Edit from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Chip, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { setIsOpen } from "src/redux/slices/dialogs";
// import { useRouter } from "next/navigation";
import Dialog from "src/components/dialogs/Dialog";
import { useNavigate } from 'react-router';

export const ActionButtons = (params) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dialogType = {
    delete: "DELETE",
    update: "UPDATE",
    view: "VIEW",
  };

  const handleActions = (arg) => {
    if (arg === "DELETE") {
      dispatch(setIsOpen(true));
    }
  };
  // const router = useRouter();
  return (
    <>
      <Box sx={{ display: "inline" }}>
        <IconButton
          onClick={() =>
            navigate(
              `/settings/user-listing/edit-user?userId=${params.data.id}`
            )
          }
          aria-label="edit"
          size="small"
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => handleActions(dialogType.delete)}
          aria-label="delete"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <Dialog
        title={"Confirmation Dialog"}
        dialogText={`Are you sure you want to delete ${params?.data?.name} ?`}
        buttonText={"Yes"}
        data={params}
      />
    </>
  );
};

const CustomChip1 = styled(Chip)(({ theme }) => ({
  border: "2px solid #C6F0C2",
  borderRadius: "5px",
  color: "#2F6846",
  backgroundColor: "#EAFBE7",
  fontWeight: 700,
}));

const CustomChip2 = styled(Chip)(({ theme }) => ({
  border: "2px solid #E0C1F4",
  borderRadius: "5px",
  color: "#8312D1",
  backgroundColor: "#F6ECFC",
  fontWeight: 700,
}));

export const RenderStatusChip = ({
  value,
}) => {
  if (value) {
    return <CustomChip1 label="Active" theme={undefined} />;
  }
  return <CustomChip2 label="Inactive" theme={undefined} />;
};
