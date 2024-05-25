"use client"
import { Card, CardContent, CardMedia, Grid, Typography, Box } from '@mui/material';
// types.ts
interface Category {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }
  
   interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }
  
   interface TItem {
    id: string;
    userId: string;
    categoryId: string;
    status: string;
    foundItemName: string;
    description: string;
    location: string;
    foundDate: string;
    img: string;
    phone: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    category: Category;
    user: User;
  }
  

const FoundItemCard = ({ item }:{item:TItem}) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={item.img || 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png'}
        title={item.foundItemName}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {item.foundItemName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Location:</strong> {item.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Found Date:</strong> {new Date(item.foundDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Contact:</strong> {item.phone}, {item.email}
        </Typography>
      </CardContent>
    </Card>
  );
};

const FoundItems = ({ items=[] }:{items:TItem[]}) => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <FoundItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FoundItems;
